import React, { createContext, useState, useContext } from 'react';

export interface TaskDate {
  year: number;
  month: number;
  date: number;
  day?: number;
  isActive?: boolean;
}

export const days = ['일', '월', '화', '수', '목', '금', '토'];
export const dayNames = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
];

//context value 타입
interface TaskDateContextType {
  taskDate: TaskDate;
  setTaskDate: React.Dispatch<React.SetStateAction<TaskDate>>;
  today: TaskDate;
}

export const DateContext = createContext<TaskDateContextType | undefined>(
  undefined,
);

export const DateContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const day = now.getDay();
  const today: TaskDate = {
    year: year,
    month: month,
    date: date,
    day: day,
  };
  const [taskDate, setTaskDate] = useState<TaskDate>(today);

  return (
    <DateContext.Provider value={{ taskDate, setTaskDate, today }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDateContext = () => {
  const dateContext = useContext(DateContext);
  if (dateContext === undefined) {
    throw new Error('useDateContext hook must be inside a DateContextProvider');
  }
  return dateContext;
};
