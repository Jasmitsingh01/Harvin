// import * as React from 'react';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import { useTranslation } from 'react-i18next';
// import { CircularProgress } from '@mui/material';

// export default function AutocompleteSelect(props: any) {
//   const { t } = useTranslation();

//   const {
//     options = [],
//     label,
//     name,
//     error,
//     register,
//     setValue,
//     loading,
//     clearErrors,
//   } = props;

//   const [open, setOpen] = React.useState(false);

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handleAutocompleteChange = (event: any, value: any) => {
//     setValue(name, value);
//     clearErrors(name); // Clear errors for the Autocomplete field
//   };

//   return (
//     <React.Fragment>
//       <Autocomplete
//         {...register(name)}
//         id="combo-box-demo"
//         options={options}
//         open={open}
//         onOpen={handleOpen}
//         onClose={handleClose}
//         getOptionLabel={(option: any) => option?.label || option}
//         sx={{
//           width: '100%',
//           '& .MuiOutlinedInput-root': {
//             '& fieldset': {
//               borderColor: '#ededed', // Change border color here
//             },
//             '&:hover fieldset': {
//               borderColor: '#ededed', // Change border color on hover here
//             },
//             '&.Mui-focused fieldset': {
//               borderColor: '#ededed', // Change border color when focused here
//             },
//           },
//         }}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             label={open ? '' : label}
//             placeholder={label}
//             InputProps={{
//               ...params.InputProps,
//               endAdornment: (
//                 <>
//                   {loading ? (
//                     <CircularProgress color="inherit" size={20} />
//                   ) : null}
//                   {params.InputProps.endAdornment}
//                 </>
//               ),
//             }}
//           />
//         )}
//         onChange={handleAutocompleteChange}
//       />
//       {error?.message && (
//         <p className="text-danger mt-2">{t(error?.message)}</p>
//       )}
//     </React.Fragment>
//   );
// }

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useTranslation } from 'react-i18next';
import { CircularProgress } from '@mui/material';

export default function AutocompleteSelect(props: any) {
  const { t } = useTranslation();
  const {
    options = [],
    label,
    name,
    error,
    register,
    setValue,
    loading,
    clearErrors,
    initialValue, // Pass the initial value as a prop
  } = props;

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(initialValue);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAutocompleteChange = (event: any, value: any) => {
    setSelectedValue(value);
    setValue(name, value);
    clearErrors(name); // Clear errors for the Autocomplete field
  };

  React.useEffect(() => {
    setSelectedValue(initialValue);
  }, [initialValue]);

  return (
    <React.Fragment>
      <Autocomplete
        {...register(name)}
        value={selectedValue}
        id="combo-box-demo"
        options={options}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        getOptionLabel={(option: any) => option?.label || option}
        sx={{
          width: '100%',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ededed', // Change border color here
            },
            '&:hover fieldset': {
              borderColor: '#ededed', // Change border color on hover here
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ededed', // Change border color when focused here
            },
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={open ? '' : label}
            placeholder={label}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        onChange={handleAutocompleteChange}
      />
      {error?.message && (
        <p className="text-danger mt-2">{t(error?.message)}</p>
      )}
    </React.Fragment>
  );
}
