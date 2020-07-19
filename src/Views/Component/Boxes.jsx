import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import cellcom from '../../images/cellcom.jpg'
import hot from '../../images/hot.jpg';
import partner from '../../images/partner.png';
import yes from '../../images/yes.jpg';

const images = [
  {
    url: cellcom,
    title: 'Breakfast',
    width: '25%',
  },
  {
    url: hot,
    title: 'hot',
    width: '25%',
  },
  {
    url: partner,
    title: 'partner',
    width: '25%',
  },
  {
    url: yes,
    title: 'yes',
    width: '25%',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      
    },
  },
  imageTitle: {
    border: '4px solid #27AE60',
    display: 'block',
    textAlign: "center",
    padding: theme.spacing(1),
    color: "#27AE60",
    margin: theme.spacing(1),
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.2,
    transition: theme.transitions.create('opacity'),
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

export default function Boxes(props) {
  const classes = useStyles();
  const { handleNext } = props;
  let handleChange = title => {
    document.getElementById('selectedImage').innerHTML = title;
    handleNext();
  }
  return (
    <div className={classes.root}>
      {images.map((image) => (
        <ButtonBase
          focusRipple
          key={image.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{ width: image.width, }}
          onClick={() => handleChange(image.title)}
        >
          <span className={classes.imageSrc} style={{ backgroundImage: `url(${image.url})` }} />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}></span>
        </ButtonBase>
      ))}
    </div>
  );
}