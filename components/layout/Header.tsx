import { PlusIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <header className='flex fixed w-[1920px] h-[100px] justify-between items-center pt-[30px] pr-[120px] pb-[30px] pl-[120px]'>
            <div className='flex w-[210px] h-[38px] gap-1'>
                <div className='font-fredoka text-purpletext w-[168px] h-[38px] pt-[3.5px] font-normal text-[31px] leading-[100%] tracking-normal'>Momentum</div>
                <div className='flex'>
                <Image
                        src={'/images/Hourglass.svg'}
                        alt='mainlogo'
                        width={38}
                        height={38}
                        style={{ height: 'auto', width: 'auto' }}
                        priority
                    />
                </div>
            </div>
            <div className='flex w-[533px] h-10 gap-10 font-firago font-normal'>
                <Link href={'#'} className='text-center text-[16px] leading-[100%] tracking-normal w-[225px] h-[39px] rounded-[5px] border-[1px] pt-2.5 pr-5 pb-2.5 pl-5 gap-2.5'>თანამშრომლის შექმნა</Link>
                <Link href={'#'} className='text-center text-[16px] leading-[100%] tracking-normal w-[268px] h-10 rounded-[5px] pt-2.5 pr-5 pb-2.5 pl-5 gap-1 flex bg-purpletext text-whitetext'><PlusIcon /> შექმენი ახალი დავალება</Link>
            </div>
        </header>
    )
}

export default Header