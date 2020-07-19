import gql from 'graphql-tag'

import createResident from './createResident.gql'
import createBooking from './createBooking.gql'

export const CREATE_RESIDENT = gql`${createResident}`
export const CREATE_BOOKING = gql`${createBooking}`
