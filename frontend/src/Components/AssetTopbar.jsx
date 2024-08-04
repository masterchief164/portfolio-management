import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const time = [
    "1W",
    "1M",
    "3M",
    "6M",
    "1Y",
    "5Y"
]

const AssetTopbar = ({period, handleChange}) => {

    return (
        <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 50 }}>
                {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}
                <Select
                id="demo-simple-select-standard"
                value={period}
                onChange={handleChange}
                displayEmpty
                >
                    {
                        time.map(t => { return <MenuItem value={t}> {t} </MenuItem>})
                    }
                </Select>
            </FormControl>
        </div>
    )
    
}

export default AssetTopbar;