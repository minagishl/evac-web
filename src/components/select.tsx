import { useEffect, useRef, useState } from 'react';
import { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  text?: string;
  options: string[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({ className, text, options, onChange, ...props }: SelectProps) {
  const [selected, setSelected] = useState('');
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.value = selected;
    }
  }, [selected]);

  return (
    <div className="mt-2 max-h-10 rounded-md border-2 border-zinc-800 bg-white px-2">
      <select
        ref={selectRef}
        className={`h-9 w-full bg-white ${
          selected ? 'text-zinc-800' : 'text-zinc-400'
        } focus-visible:outline-none ${className}`}
        {...props}
        onChange={handleChange}
      >
        <option value="">{text}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
