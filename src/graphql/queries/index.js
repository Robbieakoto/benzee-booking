import gql from 'graphql-tag'

import getRoomTypes from './getRoomTypes.gql'
import getRooms from './getRooms.gql'
import getCurrentAcademicYear from "./getCurrentAcademicYear.gql"
import getBookings from "./getBookings.gql"


export const GET_ROOM_TYPES = gql`${getRoomTypes}`
export const GET_ROOMS= gql `${getRooms}`
export const GET_CURRENT_ACADEMIC_YEAR = gql`${getCurrentAcademicYear}`
export const GET_BOOKINGS = gql`${getBookings}`
