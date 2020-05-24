import { ChangeEvent, useEffect } from 'react';
import { History } from 'history';
import { useHistory } from 'react-router-dom';

export const seedStr = (): string =>
  `?seed=${Math.random().toString(36).substring(7)}`;

export const useSeed = (): [History, string | null] => {
  const history: History = useHistory();
  const urlParams = new URLSearchParams(window.location.search);
  const seed = urlParams.get('seed');
  useEffect(() => {
    if (!seed) history.replace(seedStr());
  }, [seed, history]);
  return [history, seed];
};

export const onFileChange = (
  e: ChangeEvent<HTMLInputElement>,
): Promise<string> => {
  const reader = new FileReader();
  const { files } = e.target;
  if (!files || !files.length) throw Error('no file');
  return new Promise<string>((resolve) => {
    const file = files[0];
    reader.onloadend = () => {
      if (reader.result) resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
};
