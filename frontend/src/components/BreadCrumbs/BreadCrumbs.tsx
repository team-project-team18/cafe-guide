import React from "react"
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Pages } from "../../types/Pages";

type Props = {
  pages: Pages,
}

export const BreadCrumbs: React.FC<Props> = ({ pages }) => {
  const location = useLocation();

  const pathName = location.pathname.split('/')[3];

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/cafe-guide">
        Cafe-guide
      </Link>
      <Link
        underline="hover"
        color="inherit"
        href={`/cafe-guide/${Pages.Catalog.toLowerCase()}`}
      >
        {pages}
      </Link>
      {pathName && <Typography color="text.primary">{pathName}</Typography>}
    </Breadcrumbs>
  )
}