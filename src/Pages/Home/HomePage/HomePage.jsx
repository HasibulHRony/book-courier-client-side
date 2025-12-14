import React from 'react'
import { Banner } from '../../../Components/banner/banner'
import { Coverage } from '../../../Components/Coverage/Coverage'
import { LatestBooks } from '../../LatestBooks/LatestBooks'

export const HomePage = () => {
  return (
    <div>
     <Banner></Banner>
     <LatestBooks></LatestBooks>
     <Coverage></Coverage>
    </div>
  )
}
