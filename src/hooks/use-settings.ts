import { useState, useEffect } from 'react';

export const useSettings = () => {
  const [refreshInterval, setRefreshInterval] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('refreshInterval');
      return saved !== null ? JSON.parse(saved) : 5;
    }
    return true;
  });

  const [autoScroll, setAutoScroll] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('autoScroll');
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });

  const [autoExpandSentences, setAutoExpandSentences] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('autoExpandSentences');
      return saved !== null ? JSON.parse(saved) : false;
    }
    return false;
  });

  const [autoExpandWords, setAutoExpandWords] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('autoExpandWords');
      return saved !== null ? JSON.parse(saved) : false;
    }
    return false;
  });

  const [autoExpandPhrases, setAutoExpandPhrases] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('autoExpandPhrases');
      return saved !== null ? JSON.parse(saved) : false;
    }
    return false;
  });

  const [autoCollapsePrevious, setAutoCollapsePrevious] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('autoCollapsePrevious');
      return saved !== null ? JSON.parse(saved) : false;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('refreshInterval', JSON.stringify(refreshInterval));
  }, [refreshInterval]);

  useEffect(() => {
    localStorage.setItem('autoScroll', JSON.stringify(autoScroll));
  }, [autoScroll]);

  useEffect(() => {
    localStorage.setItem('autoExpandSentences', JSON.stringify(autoExpandSentences));
  }, [autoExpandSentences]);

  useEffect(() => {
    localStorage.setItem('autoExpandWords', JSON.stringify(autoExpandWords));
  }, [autoExpandWords]);

  useEffect(() => {
    localStorage.setItem('autoExpandPhrases', JSON.stringify(autoExpandPhrases));
  }, [autoExpandPhrases]);

  useEffect(() => {
    localStorage.setItem('autoCollapsePrevious', JSON.stringify(autoCollapsePrevious));
  }, [autoCollapsePrevious]);

  return {
    refreshInterval,
    setRefreshInterval,
    autoScroll,
    setAutoScroll,
    autoExpandSentences,
    setAutoExpandSentences,
    autoExpandWords,
    setAutoExpandWords,
    autoExpandPhrases,
    setAutoExpandPhrases,
    autoCollapsePrevious,
    setAutoCollapsePrevious
  };
};
