export class CreateDictionaryDto {
  text: string;
  pinyin: string;
  traditional_chinese?: string | null;
  definition: string;
  type: string;
  image?: string | null;
  audio?: string | null;
  video?: string | null;
}
