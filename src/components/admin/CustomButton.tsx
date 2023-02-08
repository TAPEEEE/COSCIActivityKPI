import { FC, memo, useState } from 'react';

interface ButtonProps {
  w: string;
  color: string;
  textcolor: string;
}

const CustomButton: FC<ButtonProps> = (props) => {
  const { w, color, textcolor } = props;

  return (
    <button
      type="button"
      className={`${color} ${w} ${textcolor} hover:${color} font-Kanit mt-4 mb-4 mr-4 inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium  shadow-sm`}
    >
      เพิ่มกิจกรรม
    </button>
  );
};

export default memo(CustomButton);
