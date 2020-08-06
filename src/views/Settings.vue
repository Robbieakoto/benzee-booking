<template>
  <dashboard-layout>
    <template v-slot:header>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 lg:flex lg:justify-between">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">Settings</h1>  
      </div>
    </template>

    <template v-slot:content>
    <div>
      <div v-if="academicYearUpdated" class="flex items-center sm:px-6 lg:px-8 sm:max-w-lg sm:w-full my-6 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
        <div class="flex">
          <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
          <div>
            <p class="font-bold">Academic Year has been updated</p>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center py-10 px-4 lg:px-8">
          <div class="bg-white rounded-lg overflow-hidden shadow transform sm:max-w-lg sm:w-full transition duration-150 ease-in-out" aria-labelledby="modal-headline">
              <div class="px-10 py-8 sm:pb-10">
                <flip-input-with-label
                class="mt-2 flex-shrink w-full inline-block relative"
                label-name="Current Password"
                input-type="password"
                input-name="password"
                :required="true"
                ></flip-input-with-label>
                <flip-input-with-label
                class="mt-6 flex-shrink w-full inline-block relative"
                label-name="New Password"
                input-type="password"
                input-name="new_password"
                :required="true"
                ></flip-input-with-label>
                <flip-button label="Update Password" class="mb-5 mt-5">
                    <svg
                    class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    >
                    <path
                        fill-rule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clip-rule="evenodd"
                    />
                    </svg>
                </flip-button>

                <div class="mt-6">
                  <flip-select-input-with-label
                    class="flex-shrink w-full inline-block relative"
                    label-name="Academic Year"
                    input-name="academic_year"
                    option-title="Choose an acdemic year"
                    :required="true"
                    :options="academicYears"
                    v-model="academic_year_id"
                    :selected-option="currentAcademicYear"
                    ></flip-select-input-with-label>
                    <span class="mt-5 flex w-full rounded-md shadow-sm">
                      <button v-on:click="updateAcademicYear()" type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out">
                        Save Academic Year
                      </button>
                    </span>
                </div>
                
              </div>
          </div>
      </div>
    </div>
    </template>
  </dashboard-layout>
</template>

<script>
import DashboardLayout from "@/components/DashboardLayout.vue";
import FlipSelectInputWithLabel from "../components/SelectInputWithLabel";
import FlipInputWithLabel from "../components/InputWithLabel";
import FlipButton from "../components/Button";
import { GET_CURRENT_ACADEMIC_YEAR, GET_ALL_ACADEMIC_YEARS} from '@/graphql/queries'
import { UPDATE_ACADEMIC_YEAR } from '@/graphql/mutations'

export default {
  name: "Settings",
  components: {
    DashboardLayout,
    FlipSelectInputWithLabel,
    FlipInputWithLabel,
    FlipButton
  },
  data() {
    return {
      academic_years: [],
      academic_year: null,
      academic_year_id: null,
      academicYearUpdated:false
    }
  },
  apollo:{
    academic_year: {
      query: GET_CURRENT_ACADEMIC_YEAR,
      error (error) {
        this.error = JSON.stringify(error.message)
      }
    },
    academic_years:{
      query: GET_ALL_ACADEMIC_YEARS,
      error(error){
        this.error = JSON.stringify(error.message)
      }
    }
  },
  computed: {
    academicYears() {
      return this.academic_years.map((year)=>{
        return {
          key: year.id,
          label: year.value,
          value: year.id
        }
      })
    },
    academicYearDetails(){
      if (this.$apollo.queries.academic_year.loading) return {}
      return this.academic_year[0]
    },
    currentAcademicYear() {
      return {
        id: this.academicYearDetails.id,
        title: this.academicYearDetails.value
      }
    }
  },
   methods:{
    async updateAcademicYear(){
      this.academicYearUpdated = false
      await this.$apollo.mutate({
         mutation: UPDATE_ACADEMIC_YEAR,
         variables:{ 
           id: this.academic_year_id,
           is_current: true
         },
         update:(cache, {data:{update_academic_year} }) => {
          if (update_academic_year.affected_rows ) {
            this.academicYearUpdated = true
            const data = cache.readQuery({
              query: GET_ALL_ACADEMIC_YEARS
            }); 
            const currentYear = data.academic_years.find(currentYear => currentYear.id === this.currentAcademicYear.id);
            console.log(currentYear)
            currentYear.is_current= false

            const academicYear = data.academic_years.find(academicYear => academicYear.id === this.academic_year_id);
            academicYear.is_current = true
            
            cache.writeQuery({
              query: GET_ALL_ACADEMIC_YEARS,
              data
            });
            this.academicYearUpdated = true
           } 
         }
      })
      }
    }
};
</script>