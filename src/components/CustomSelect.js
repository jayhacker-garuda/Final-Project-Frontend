import React from 'react'
import { Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';

function classNames(...classes) {

    return classes.filter(Boolean).join(' ');
}
function CustomSelect({ control, name, rules = {}, children, blog }) {
    return (
        <>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { value, onChange, onBlur, ref }, formState: { errors }, fieldState: { isTouched, error } }) => (
                    <>
                        <select
                            onBlur={onBlur}
                            name={name}
                            // type={type}
                            className={classNames(
                                error
                                    ? 'border-red-300 focus:ring-red-500 '
                                    : 'border-teal-400 focus:ring-teal-500 ',
                                'appearance-none block w-full  border rounded-md shadow-sm placeholder-teal-400 focus:outline-none sm:text-sm',
                                name === 'query' ? 'bg-gray-700 pl-8 text-xs' : undefined,
                                blog ? 'py-3 px-4' : 'px-3 py-2',
                            )}
    
                            onChange={onChange}
                            value={value}
                            // placeholder={placeholder}
                            // rules={rules}
                            ref={ref}

                        >
                            {children}
                        </select>

                        {errors && (
                            <>
                                <ErrorMessage errors={errors} name={name} render={({ message }) => <p className="text-sm text-red-500">{message}</p>} />
                                {/* {errors} */}
                            </>
                        )}
                    </>
                )}
            />
        </>
    )
}

export default CustomSelect