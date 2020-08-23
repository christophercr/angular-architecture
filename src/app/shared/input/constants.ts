import {FilesConfig} from '@shared/input/entities/files-config';

export const FILES: FilesConfig = {
  image: ['png', 'jpg', 'jpeg'],
  doc: ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'],
  pdf: ['pdf']
};

export const MAX_FILE_SIZE: number = 8 * 1000 * 1000; // MB
