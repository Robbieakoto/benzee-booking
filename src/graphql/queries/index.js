import gql from 'graphql-tag'

import getRoomTypes from './getRoomTypes.gql'
import getRooms from './getRooms.gql'
import getRoomDetails from './getRoomDetails.gql'
import getCurrentAcademicYear from "./getCurrentAcademicYear.gql"
import userLogin from "./getLogin.gql"
import getBookings from "./getBookings.gql"
import getPaidBookings from "./getPaidBookings.gql"
import getUnPaidBookings from "./getUnPaidBookings.gql"
import getBookingDetails from "./getBookingDetails.gql"
import getResidents from "./getResidents.gql"
import getFiveBookings from "./getFiveBookings.gql"

export const GET_ROOM_TYPES = gql`${getRoomTypes}`
export const GET_ROOMS= gql `${getRooms}`
export const GET_ROOM_DETAILS = gql `${getRoomDetails}`
export const GET_CURRENT_ACADEMIC_YEAR = gql`${getCurrentAcademicYear}`
export const LOGIN_USER = gql`${userLogin}`
export const GET_BOOKINGS = gql`${getBookings}`
export const GET_PAID_BOOKINGS = gql `${getPaidBookings}`
export const GET_UNPAID_BOOKINGS = gql `${getUnPaidBookings}`
export const GET_FIVE_BOOKINGS = gql `${getFiveBookings}`
export const GET_BOOKING_DETAILS = gql `${getBookingDetails}`
export const GET_RESIDENTS = gql`${getResidents}`

