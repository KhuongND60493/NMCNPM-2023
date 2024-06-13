import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { ConferenceWebsite } from '@/features/events/types';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
interface HeaderProps {
  sections: ReadonlyArray<ConferenceWebsite>;
  title: string;
}
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Header(props: HeaderProps) {
  const { sections, title } = props;
  const navigate = useNavigate();
  const handleGotoWebsite = (id: number) => {
    navigate(`/${id}`);
  };
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
          <Typography component="h2" variant="h5" color="inherit" align="left" noWrap sx={{ flex: 1 }}>
            {title}
          </Typography>
          <Box display={'flex'} flexDirection={'row'}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}

              />
            </Search>

            <Link href={'/admin'}>
              <Button variant="outlined" size="small">
                Go to Admin Page
              </Button>
            </Link>
          </Box>
        </Box>
      </Toolbar>
      <Toolbar component="nav" variant="dense" sx={{ justifyContent: 'flex-start', overflowX: 'auto' }}>
        {sections.map(section => (
          <Link
            key={`section_${section.id}`}
            color="inherit"
            noWrap
            variant="body2"
            onClick={() => handleGotoWebsite(section.id)}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.name}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}
