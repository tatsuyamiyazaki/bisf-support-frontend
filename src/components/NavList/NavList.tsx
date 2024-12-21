import React from 'react';
import {BsRocketTakeoff} from 'react-icons/bs';
import {FaRocket} from 'react-icons/fa';
import NavItem from './NavItem';

interface NavItemTtype {
    id: number;
    label: string;
    link: string;
    icon: React.ReactNode;
}

const NavList = () => {
    const navList: NavItemTtype[] = [
        {id: 1, label: 'On Your Data', link: '/', icon: <BsRocketTakeoff className='size-5'/>},
    ];
    return(
        <div className='mt-12'>
            {navList.map((navItem) => (
                <NavItem
                    key={navItem.id}
                    label={navItem.label}
                    link={navItem.link}
                    icon={navItem.icon}/>
            ))}
        </div>
    )
}

export default NavList;