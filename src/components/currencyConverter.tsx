import React, { useEffect, useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select  from '@mui/material/Select';
import { InputLabel } from '@mui/material';

const CurrencyConverter = () => {
    const[countryCode, setCountryCode]=useState<[]>([])
    const[selectedCurrency, setSelectedCurrency]= useState<string>('')
useEffect(() => {
    getCountryViseCurrency()
}, []);

    const getCountryViseCurrency = ()=>{
        const apiUrl = 'https://api.frankfurter.app/currencies'
        fetch(apiUrl).then((res)=>{
             res.json().then((data)=> {
        console.log(data);
              
            setCountryCode(data)
            })
            
        })   
    }

    const handleChange= (e: any)=>{
console.log(e.target.value);

    }

    // const renderMenu = ()=>{
    //   Object.keys(countryCode as any).forEach((key)=> {
    //    return console.log(countryCode[key as any]) // baz
    //   })
    //   }
  return (

    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
    <InputLabel id="demo-select-small-label">Age</InputLabel>
    <Select
      labelId="demo-select-small-label"
      id="demo-select-small"
      value={selectedCurrency}
      label="Age"
      onChange={handleChange}
    >

  

{
  Object.keys(countryCode as any).map((i)=>(

    <MenuItem value={i} >{i}</MenuItem>
  ))

}
  
    </Select>
  </FormControl>
  
  )}
export default CurrencyConverter
