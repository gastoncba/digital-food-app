import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  useMediaQuery,
  Theme,
  Paper,
  Container,
} from '@mui/material';
import { useNavigate, NavigateOptions } from 'react-router-dom';

import { Paragraph } from '../Paragraph/Paragraph.component';
import { Icon } from '../Icon/Icon.component';
import { iconStyles, buttonStyles, ParagraphStyles } from './styles';
import { Sidebar } from '../Sidebar/Sidebar.component';
import { Divider } from '../Divider/Divider.component';

interface Page {
  url: string;
  name: string;
  options?: NavigateOptions;
}

interface NavbarProps {
  pages: Page[];
  currentPage: () => string;
}

export const Navbar: React.FC<NavbarProps> = ({ pages, currentPage }) => {
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const redirect = (url: string, navigateOptions?: NavigateOptions) => {
    navigate(url, navigateOptions);
  };

  useEffect(() => {
    if (isMd) {
      setShowSidebar(false);
    }
  }, [isMd]);

  return (
    <AppBar position="static" sx={{ bgcolor: 'white' }} elevation={1}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, px: 2 }}>
          <Paragraph text={'Digital Food'} variant="h6" color="primary" />
          {pages.length > 0 && (
            <>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', md: 'flex' },
                  px: 3,
                  ...(isMd && {
                    columnGap: 2,
                  }),
                }}
              >
                {pages.map((page, index) => (
                  <Box
                    key={index}
                    sx={buttonStyles}
                    onClick={() => redirect(page.url, page.options)}
                  >
                    <Paragraph
                      variant="h6"
                      text={page.name}
                      sx={{
                        ...ParagraphStyles,
                        color:
                          page.url === currentPage() ? 'primary.main' : 'black',
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </>
          )}
        </Box>
        {pages.length > 0 && (
          <>
            <Paper
              elevation={2}
              sx={{
                ...iconStyles,
                ...(isMd && {
                  display: { md: 'none' },
                }),
              }}
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <Icon type="DRAG-HANDLE" />
            </Paper>
            <Sidebar
              show={showSidebar}
              onClose={() => setShowSidebar(false)}
              anchor="left"
              variant={'temporary'}
            >
              <RouterList
                pages={pages}
                redirect={redirect}
                currentPage={currentPage}
              />
            </Sidebar>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

interface RouterListProps {
  pages: Page[];
  redirect: (url: string, navigateOptions?: NavigateOptions) => void;
  currentPage: () => string;
}

const RouterList: React.FC<RouterListProps> = ({
  pages,
  redirect,
  currentPage,
}) => {
  return (
    <>
      <Container maxWidth="md" sx={{ py: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
          <Box>
            <Paragraph text={'Digital Food'} variant="h6" color="primary" />
            <Divider sx={{ pt: 0.7 }} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1 }}>
            {pages.map((page) => (
              <Box
                key={page.name}
                sx={{
                  flexShrink: 0,
                  lineHeight: 1,
                  userSelect: 'none',
                  cursor: 'pointer',
                  borderRadius: '8px',
                }}
                onClick={() => redirect(page.url, page.options)}
              >
                <Paragraph
                  variant="h6"
                  text={page.name}
                  sx={{
                    ...ParagraphStyles,
                    color:
                      page.url === currentPage() ? 'primary.main' : 'black',
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
};
