
import React, { ReactNode } from 'react';

interface RandomImageProps {
  children: (src: string) => ReactNode;
}

export const RandomCenterleft: React.FC<RandomImageProps> = ({ children }) => {
  const randomNumber = Math.floor(Math.random() * 20) + 1;
  const imagePath = `/sourceimage/centerleft${randomNumber}.jpg`;
  return <>{children(imagePath)}</>;
};

export const RandomGrey: React.FC<RandomImageProps> = ({ children }) => {
  const randomNumber = Math.floor(Math.random() * 20) + 1;
  const imagePath = `/sourceimage/grey${randomNumber}.jpg`;
  return <>{children(imagePath)}</>;
};

export const RandomLeft: React.FC<RandomImageProps> = ({ children }) => {
  const randomNumber = Math.floor(Math.random() * 20) + 1;
  const imagePath = `/sourceimage/left${randomNumber}.jpg`;
  return <>{children(imagePath)}</>;
};

export const RandomCenterRight: React.FC<RandomImageProps> = ({ children }) => {
  const randomNumber = Math.floor(Math.random() * 20) + 1;
  const imagePath = `/sourceimage/centerright${randomNumber}.jpg`;
  return <>{children(imagePath)}</>;
};

export const RandomRight: React.FC<RandomImageProps> = ({ children }) => {
  const randomNumber = Math.floor(Math.random() * 20) + 1;
  const imagePath = `/sourceimage/right${randomNumber}.jpg`;
  return <>{children(imagePath)}</>;
};

