<template>
  <div>
    <label
      :for="inputName"
      :class="labelClass"
      class="block mb-2 leading-none text-gray-800 font-medium"
    >{{ labelName }}</label>
    <input
      :type="inputType"
      :name="inputName"
      :value="value"
      @input="$emit('input', $event.target.value)"
      class="form-input border-gray-300 shadow-sm block w-full pl-7 pr-12 py-3 sm:text-sm sm:leading-5"
      :required="required"
      :class="errorMessage ? 'border border-red-500' : ''"
      @blur="handleBlur"
    />
    <p v-if="errorMessage" class="mt-1 text-red-500 text-xs italic">{{ errorMessage }}</p>
  </div>
</template>
<script>
export default {
  name: "FlipInputWithLabel",
  props: [
    "labelName",
    "labelClass",
    "inputClass",
    "inputType",
    "inputName",
    "required",
    "value",
    "errorMessage"
  ],
  methods: {
    handleBlur(e) {
      this.$emit('blur', e)
    }
  }
};
</script>