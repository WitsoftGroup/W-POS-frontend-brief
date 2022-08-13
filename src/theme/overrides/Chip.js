import { Icon } from '@iconify/react';
import closeCircleFill from '@iconify/icons-eva/close-circle-fill';

// ----------------------------------------------------------------------

const Chip = (theme) => ({
  MuiChip: {
    defaultProps: {
      deleteIcon: <Icon icon={closeCircleFill} />
    },

    styleOverrides: {
      label: {
        marginTop: -1
      },
      colorDefault: {
        '& .MuiChip-avatarMedium, .MuiChip-avatarSmall': {
          color: theme.palette.text.secondary
        }
      }
    }
  }
});

export default Chip;
