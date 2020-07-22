import gql from 'graphql-tag'

import getRoomTypes from './getRoomTypes.gql'
import getCurrentAcademicYear from "./getCurrentAcademicYear.gql"
import userLogin from "./getLogin.gql"

export const GET_ROOM_TYPES = gql`${getRoomTypes}`
export const GET_CURRENT_ACADEMIC_YEAR = gql`${getCurrentAcademicYear}`
export const LOGIN_USER = gql`${userLogin}`
