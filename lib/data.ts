import fs from 'fs';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'data');

export async function getData(filename: string) {
  const filePath = path.join(dataDirectory, `${filename}.json`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export async function saveData(filename: string, data: any) {
  const filePath = path.join(dataDirectory, `${filename}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  return true;
}