import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './components/Header';
import MainFeaturedConferencet from './components/MainFeaturedConferencet';
import { FeaturedConference } from './components';
import { useEffect, useState } from 'react';
import { getAllEvents } from '@/features/events/eventServices';
import { Conference, ConferencePagination, ConferenceWebsite } from '@/features/events/types';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Pagination } from '@mui/material';
import Box from '@mui/material/Box';
import { Copyright } from '@/containers';
const defaultTheme = createTheme();

export default function HomePage() {
  const navigate = useNavigate();
  const [sources, setSources] = useState<Conference[]>([]);
  const [websites, setWebsites] = useState<ConferenceWebsite[]>([]);
  const [paging, setPaging] = useState<ConferencePagination | undefined>(undefined);
  const { search } = useLocation();
  let { websiteId } = useParams();
  const searchQuery = React.useMemo(() => new URLSearchParams(search), [search]);
  useEffect(() => {
    const page = searchQuery.get('page');
    getAllEvents(websiteId, page).then(rs => {
      if (rs.status && typeof rs.data !== 'string') {
        setSources(rs?.data?.data || []);
        setWebsites(rs?.data?.website || []);
        setPaging(rs?.data?.paging || undefined);
      }
    });
  }, [websiteId, searchQuery]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    navigate({
      pathname: websiteId ? `/${websiteId}` : '/all',
      search: `?page=${value}`,
    });
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Crawl Events App" sections={websites} />
        <main>
          <MainFeaturedConferencet conference={sources[0] || undefined} />
          <Grid container spacing={4}>
            {sources.map((conference, index) => (
              <FeaturedConference key={`conference_${conference.id}_${index}`} conference={conference} />
            ))}
          </Grid>
          <Box my={4} display={'flex'} justifyContent={'flex-end'}>
            <Pagination
              onChange={handleChange}
              count={paging?.page}
              defaultPage={paging?.currentPage || 0 + 1}
              showFirstButton
              showLastButton
            />
          </Box>
          <Box mb={4}>
            <Copyright />
          </Box>
        </main>
      </Container>
    </ThemeProvider>
  );
}
