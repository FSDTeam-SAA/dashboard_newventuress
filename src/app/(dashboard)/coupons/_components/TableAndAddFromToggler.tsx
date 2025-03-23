"use client"
import React, { useState } from 'react';
import CuponHeader from './CuponHeader';
import CuponFilter from './CuponFilter';
import CuponContainer from './CuponContainer';
import AddCupon from './AddCupon';

const TableAndAddFromToggler = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <CuponHeader isOpen={isOpen} setIsOpen={setIsOpen}/>
            <CuponFilter />
            {
                isOpen ? <AddCupon setIsOpen={setIsOpen}/> : <CuponContainer />
            }
            
        </div>
    );
};

export default TableAndAddFromToggler;