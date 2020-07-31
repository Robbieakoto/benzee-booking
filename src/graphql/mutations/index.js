import gql from 'graphql-tag'

import createResident from './createResident.gql'
import createBooking from './createBooking.gql'
import createRoom from './createRoom.gql'
import approveBookingRequest from './approveBookingRequest.gql'
import declineBookingRequest from './declineBookingRequest.gql'
import assignRoom from './assignRoom.gql'
import updateResidentStatus from './updateResident.gql'
import updateRoom from './updateRoom.gql'
import deleteRoom from './deleteRoom.gql'



export const CREATE_RESIDENT = gql`${createResident}`
export const CREATE_BOOKING = gql`${createBooking}`
export const CREATE_ROOM = gql `${createRoom}`
export const APPROVE_BOOKING_REQUEST = gql `${approveBookingRequest}`
export const DECLINE_BOOKING_REQUEST = gql`${declineBookingRequest}`
export const ASSIGN_ROOM = gql`${assignRoom}`
export const UPDATE_RESIDENT = gql`${updateResidentStatus}`
export const UPDATE_ROOM = gql`${updateRoom}`
export const DELETE_ROOM = gql`${deleteRoom}`



