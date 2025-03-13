import { PlusIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CustomButtom from '../custom/CustomButton'
import CustomButton from '../custom/CustomButton'

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

            <div className='hidden md:flex w-[533px] h-10 gap-10 font-firago font-normal text-headlines'>
                <Link href={'#'} >
                    <CustomButton title='თანამშრომლის შექმნა' style='w-[225px] h-[39px]'/>
                </Link>
                <Link href={'#'} >
                    <CustomButton title='შექმენი ახალი დავალება' fill icon={<PlusIcon />} style='w-[268px] h-10'/>
                </Link>
            </div>

        </header>
    )
}

export default Header