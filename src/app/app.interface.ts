export interface IManga {
  _id?: string;
  Title: string;
  English: string;
  Native: string;
  Type: string;
  Volumes: number;
  Chapters: number;
  Genres: Array<string>;
  Authors: Array<string>;
  Serialization: string;
  Score: Number;
  Start: string;
  End: string;
  URL: string;
  isFinished: boolean;
  Synopsis: string;
  Synonyms: Array<string>;
}
