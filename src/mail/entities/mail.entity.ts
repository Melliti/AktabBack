import { UUID } from "crypto";

export interface MailEntity {
  id: UUID;
  userid: string;
  tone: string;
  core: string;
  context: string;
  generated: string;
  created: String; 
}