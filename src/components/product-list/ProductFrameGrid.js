import React, { useState } from 'react'
import clsx from 'clsx'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles } from '@material-ui/core/styles'
import { navigate } from 'gatsby'

import QuickView from './QuickView'
import frame from '../../images/product-frame-grid.svg'


const useStyles = makeStyles(theme => ({
    frame: {
        backgroundImage: `url(${frame})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        height: '22rem',
        width: '22rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
          height: '18rem',
          width: '18rem',
        },
    },
    product: {
        height: '20rem',
        width: '20rem',
        [theme.breakpoints.down('xs')]: {
          height: '15rem',
          width: '15rem',
        },
    },
    title: {
        backgroundColor: theme.palette.primary.main,
        height: '4rem',
        width: '22rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '-0.1rem',
        [theme.breakpoints.down('xs')]: {
          width: '18rem',
        },
    },
    invisibility: {
      visibility: 'hidden',
    },
    frameContainer:{ 
      '&:hover': {
        cursor: 'pointer',
      },
    },
}))

export const colorIndex = (product, variant, color) => {
  return product.node.variants.indexOf(product.node.variants.filter(
  item => item.color === color && variant.style === item.style && item.size === variant.size)[0])
}

export default function ProductFrameGrid({
  product,
  variant,
  sizes,
  colors,
  selectedSize,
  selectedColor,
  setSelectedSize,
  setSelectedColor,
  hasStyles,
  rating,
  stock
}) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const matchesMD = useMediaQuery(theme => theme.breakpoints.down('md'));

  if(matchesMD && open) {
    setOpen(false)
  }

  const imageIndex = colorIndex(product, variant, selectedColor)

  const imgURL = process.env.GATSBY_STRAPI_URL + (imageIndex !== -1 ? product.node.variants[imageIndex].images[0].url : variant.images[0].url)
  const productName = product.node.name.split(" ")[0]

  return (
    <Grid
      item
      classes={{
        root: clsx(classes.frameContainer, {
          [classes.invisibility]: open === true,
        }),
      }}
    >
      <Grid
        container
        direction="column"
        onClick={() =>
          matchesMD 
            ? navigate(
                `/${product.node.category.name.toLowerCase()}/${product.node.name
                  .split(" ")[0]
                  .toLowerCase()}${hasStyles ? `?style=${variant.style}` : ''}`
              )
            : setOpen(true)
        }
      >
        <Grid item classes={{ root: classes.frame }}>
          <img
            src={imgURL}
            alt={product.node.name}
            className={classes.product}
          />
        </Grid>
        <Grid item classes={{ root: classes.title }}>
          <Typography variant="h5">{productName}</Typography>
        </Grid>
      </Grid>
      <QuickView
        open={open}
        setOpen={setOpen}
        url={imgURL}
        name={productName}
        sizes={sizes}
        colors={colors}
        price={variant.price}
        product={product}
        variant={variant}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        setSelectedSize={setSelectedSize}
        setSelectedColor={setSelectedColor}
        hasStyles={hasStyles}
        stock={stock}
        rating={rating}
        imageIndex={imageIndex}
      />
    </Grid>
  )
}