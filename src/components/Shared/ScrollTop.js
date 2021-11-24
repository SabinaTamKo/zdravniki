import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import MuiFab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';

const Fab = styled(MuiFab)(({ theme }) => ({
  '&.MuiFab-root': {
    color: theme.customColors.dark,
    backgroundColor: theme.customColors.brand,
    opacity: 0.56,
  },
  '&.MuiFab-root:hover': {
    opacity: 1,
  },
}));

export function ScrollTop(props) {
  const { children } = props;
  const [node, setNode] = useState(window);

  useEffect(() => {
    const scrollable = document.getElementById('scrollableDiv');
    setNode(scrollable);
  }, []);

  const trigger = useScrollTrigger({
    target: node,
    disableHysteresis: true,
    threshold: 700,
  });

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 9999 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
};

export const ToFront = styled('div')(({ theme }) => ({
  zIndex: 9999,
}));
export const MainScrollTop = props => (
  <ScrollTop {...props}>
    <Fab size="small" aria-label="scroll back to top">
      <KeyboardArrowUpIcon />
    </Fab>
  </ScrollTop>
);
