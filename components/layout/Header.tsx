import { PlusIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <header className="sticky top-0 w-full h-[100px] flex justify-between items-center lg:px-[120px] md:px-10 sm:px-6 xs:px-4 py-[30px] bg-white z-10">
            <div className='flex w-[210px] h-[38px] gap-1'>
                <div className='font-fredoka text-purpletext w-[168px] h-[38px] pt-[3.5px] text-[31px] leading-[100%]'>
                    Momentum
                </div>
                <div>
                    <Image
                        src={'/images/Hourglass.svg'}
                        alt='mainlogo'
                        width={38}
                        height={38}
                        className="w-auto h-auto"
                        priority
                    />
                </div>
            </div>

            <div className='hidden md:flex w-[533px] h-10 gap-10 font-firago font-extralight text-darktext'>
                <Link href={'#'} className='text-[16px] leading-none tracking-normal w-[225px] h-[39px] border-[1px] border-purpletext hover:border-purplehover transition duration-200 rounded-[5px] px-5 py-2.5 whitespace-nowrap'>
                    თანამშრომლის შექმნა
                </Link>
                <Link href={'#'} className='text-[16px] leading-none tracking-normal w-[268px] h-10 rounded-[5px] px-5 py-2.5 flex items-center gap-1 bg-purpletext hover:bg-purplehover transition duration-200 text-whitetext whitespace-nowrap'>
                    <PlusIcon /> შექმენი ახალი დავალება
                </Link>
            </div>

        </header>
    )
}

export default Header