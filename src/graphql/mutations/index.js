import gql from 'graphql-tag'

import createResident from './createResident.gql'
import createBooking from './createBooking.gql'
import createRoom from './createRoom.gql'
import approveBookingRequest from './approveBookingRequest.gql'
import declineBookingRequest from './declineBookingRequest.gql'
import assignRoom from './assignRoom.gql'


export const CREATE_RESIDENT = gql`${createResident}`
export const CREATE_BOOKING = gql`${createBooking}`
export const CREATE_ROOM = gql `${createRoom}`
export const APPROVE_BOOKING_REQUEST = gql `${approveBookingRequest}`
export const DECLINE_BOOKING_REQUEST = gql`${declineBookingRequest}`
export const ASSIGN_ROOM = gql`${assignRoom}`



