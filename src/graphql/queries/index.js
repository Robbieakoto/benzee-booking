import gql from 'graphql-tag'

import getRoomTypes from './getRoomTypes.gql'
import getRooms from './getRooms.gql'
import getCurrentAcademicYear from "./getCurrentAcademicYear.gql"
import userLogin from "./getLogin.gql"
import getBookings from "./getBookings.gql"
import getResidents from "./getResidents.gql"

export const GET_ROOM_TYPES = gql`${getRoomTypes}`
export const GET_ROOMS= gql `${getRooms}`
export const GET_CURRENT_ACADEMIC_YEAR = gql`${getCurrentAcademicYear}`
export const LOGIN_USER = gql`${userLogin}`
export const GET_BOOKINGS = gql`${getBookings}`
export const GET_RESIDENTS = gql`${getResidents}`

