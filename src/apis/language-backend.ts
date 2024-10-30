import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { CreateDictionaryDto, UpdateLearnedDictionaryDto, UpdateLearningProfileDto } from './generated/nestjs-dto';

const API_DIRECT_URL = process.env.NEXT_PUBLIC_LANGUAGE_API_URL || 'http://localhost:3000';
// const API_DIRECT_URL = 'http://localhost:8080/https://chatgpt.com/backend-api';

export const createDictionary = async (dictionary: CreateDictionaryDto) => {
  const response = await axios.post(`${API_DIRECT_URL}/dictionaries`, dictionary);
  return response.data;
};

export const getDictionaries = async (text: string) => {
  const response = await axios.get(`${API_DIRECT_URL}/dictionaries?filter=text||$cont||${text}`);
  return response.data;
};

export const getOneDictionary = async (text: string) => {
  const response = await axios.get(`${API_DIRECT_URL}/dictionaries?filter=text||$eq||${text}`);
  return response.data && response.data.length > 0 ? response.data[0] : null;
};

export const getLearningProfile = async (profileId: string) => {
  const response = await axios.get(`${API_DIRECT_URL}/learning-profiles/${profileId}`);
  return response.data;
};

export const patchLearningProfile = async (profileId: string, learningProfile: UpdateLearningProfileDto) => {
  const response = await axios.patch(`${API_DIRECT_URL}/learning-profiles/${profileId}`, learningProfile);
  return response.data;
};

export const getLearnedDictionaries = async (profileId: string, texts: string[]) => {
  const response = await axios.get(`${API_DIRECT_URL}/learned-dictionaries?filter=profile_id||$eq||${profileId}&filter=dictionary.text||$in||${texts.join(',')}&join=dictionary`);
  return response.data;
};

export const getLearnedWordsCount = async (profileId: string, fromDate?: Date) => {
  const fromDateFilter = fromDate ? `filter=created_at||$gte||${fromDate.toISOString()}&or=updated_at||$gte||${fromDate.toISOString()}` : '';
  const response = await axios.get(`${API_DIRECT_URL}/learned-dictionaries?filter=profile_id||$eq||${profileId}&${fromDateFilter}&limit=1&page=1`);
  return response.data.total;
};

export const getTotalWordsLearned = async (profileId: string) => {
  return await getLearnedWordsCount(profileId);
}

export const getWordsLearnedToday = async (profileId: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Strip the time part
  return await getLearnedWordsCount(profileId, today);
}

export const getOneLearnedDictionary = async (profileId: string, dictionaryId: string) => {
  const response = await axios.get(`${API_DIRECT_URL}/learned-dictionaries?filter=profile_id||$eq||${profileId}&filter=dictionary_id||$eq||${dictionaryId}`);
  return response.data && response.data.length > 0 ? response.data[0] : null;
};

export const patchOneLearnedDictionary = async (id: string, learnedDictionary: UpdateLearnedDictionaryDto) => {
  const response = await axios.patch(`${API_DIRECT_URL}/learned-dictionaries/${id}`, learnedDictionary);
  return response.data;
};

export const increaseSeenCount = async (profileId: string, dictionaryId: string) => {
  const currentProfile = await getOneLearnedDictionary(profileId, dictionaryId);
  let response : any;
  if (currentProfile)  {
    response = await axios.patch(`${API_DIRECT_URL}/learned-dictionaries/${currentProfile.id}`, { seen_count: currentProfile.seen_count + 1});
  } else {
    response = await axios.post(`${API_DIRECT_URL}/learned-dictionaries`, { 
      profile_id: profileId, dictionary_id: dictionaryId, seen_count: 1, status: 'new' });
  }

  return response.data;
};

export const updateLearnedDictionary = async (profileId: string, dictionaryId: string, isCorrect: boolean) => {
  const currentLearned = await getOneLearnedDictionary(profileId, dictionaryId);
  
  let newEaseFactor = currentLearned.ease_factor as number;
  let newInterval = currentLearned.interval as number;
  let newStatus = currentLearned.status as string;
  const now = new Date();

  // Status meanings:
  // 'new': The word has been seen but not actively studied yet
  // 'learning': The word is currently being learned and needs frequent review
  // 'reviewing': The word is known but needs periodic review to maintain memory
  // 'mastered': The word is well-known and requires infrequent review

  if (isCorrect) {
    // If the answer was correct
    if (newStatus === 'new' || newStatus === 'learning') {
      newStatus = 'reviewing';
      newInterval = 1; // Start with 1 day interval
    } else if (newStatus === 'reviewing') {
      newInterval = Math.round(newInterval * newEaseFactor);
      if (newInterval >= 21) { // If interval is 21 days or more, move to mastered
        newStatus = 'mastered';
      }
    }
    newEaseFactor = Math.max(1.3, newEaseFactor + 0.1);
  } else {
    // If the answer was incorrect
    newStatus = 'learning';
    newInterval = 0; // Reset interval
    newEaseFactor = Math.max(1.3, newEaseFactor - 0.2);
  }

  const nextReview = new Date(now.getTime() + newInterval * 24 * 60 * 60 * 1000);

  const updateData = {
    status: newStatus,
    ease_factor: newEaseFactor,
    interval: newInterval,
    next_review: nextReview,
    review_count: currentLearned.review_count + 1,
    last_reviewed: now
  };

  let response;
  if (currentLearned) {
    response = await axios.patch(`${API_DIRECT_URL}/learned-dictionaries/${currentLearned.id}`, updateData);
  } else {
    response = await axios.post(`${API_DIRECT_URL}/learned-dictionaries`, {
      profile_id: profileId,
      dictionary_id: dictionaryId,
      ...updateData,
      seen_count: 1
    });
  }

  return response.data;
};