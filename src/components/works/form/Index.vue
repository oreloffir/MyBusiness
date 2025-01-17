<template>
  <div class="workFormContainer">
    <v-card>
      <v-card-title>
        <span class="headline">כרטיס עבודה {{ work.id }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
            <date-input :work-card="work"></date-input>
            <company-inputs :work-card="work"></company-inputs>
            <work-time-inputs :work-card="work"></work-time-inputs>
            <work-description-input :work-card="work"></work-description-input>
            <work-price-inputs :work-card="work"></work-price-inputs>
            <work-payment-inputs :work-card="work"></work-payment-inputs>
            <work-tax-invoice-input
              :work-card="work"
              :key="work.id"
              v-show="work.paid"
            ></work-tax-invoice-input>
            <work-notes-input :work-card="work"></work-notes-input>
        </v-container>
        <small>* שדות חובה</small>
      </v-card-text>
      <slot name="actions"></slot>
    </v-card>
  </div>
</template>

<script>
import DateInput from "./DateInput";
import CompanyInputs from "./CompanyInputs";
import WorkTimeInputs from "./WorkTimeInputs";
import WorkNotesInput from "./WorkNotesInput";
import WorkPriceInputs from "./WorkPriceInputs";
import WorkPaymentInputs from "./WorkPaymentInputs";
import WorkTaxInvoiceInput from "./WorkTaxInvoiceInputs";
import WorkDescriptionInput from "./WorkDescriptionInput";
import WorkCard from "../../../utils/workCard/WorkCard";

export default {
  name: "WorkForm",
  props: {
    work: WorkCard
  },
  components: {
    WorkDescriptionInput,
    WorkTaxInvoiceInput,
    WorkPaymentInputs,
    WorkPriceInputs,
    WorkTimeInputs,
    WorkNotesInput,
    CompanyInputs,
    DateInput
  }
};
</script>

