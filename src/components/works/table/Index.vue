<template>
  <div :class="className" ref="worksTableContainer">
    <v-data-table
      item-key="id"
      :items="works"
      :headers="headers"
      :search="search"
      :fixed-header="true"
      :height="tableHeight"
      :footer-props="{ 'items-per-page-options': [50, 250, 500, -1] }"
      :expanded.sync="expanded"
      show-expand
      @current-items="setDisplayedWorks"
    >
      <template v-slot:top>
        <table-top class="tableTop"
          @toggleFilterMenu="toggleFilterMenu"
          @openNewWorkModal="openNewWorkModal"
        />
      </template>
      <template v-slot:item.description="{ item }">
        {{  ellipsis(item.description) }}
      </template>
      <template v-slot:item.notes="{ item }">
        {{  ellipsis(item.notes) }}
      </template>
      <template v-slot:item.date="{ item }">
        <table-date-column :workCard="item" />
      </template>
      <template v-slot:item.paymentInstrument="{ item }">
        <table-payment-column :workCard="item" />
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <WorkForm :work="item">
            <template #actions>
              <v-card-actions>
                <RowActionsColumn :workCard="item" @collapseExpended="collapseExpended"></RowActionsColumn>
              </v-card-actions>
            </template>
          </WorkForm>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import WorkCard from "../../../utils/workCard/WorkCard";
import WorksTable from "../../../utils/worksTable/WorksTable";
import TableTop from "./Top";
import TableDateColumn from "./DateColumn";
import TablePaymentColumn from "./PaymentColumn";
import WorkForm from "../form/Index";
import RowActionsColumn from "./RowActionsColumn";

export default {
  name: "WorksTable",
  props: {
    table: {
      type: WorksTable
    }
  },
  data() {
    return {
      filterMenuOpened: false,
      expanded: []
    };
  },
  components: {
    TableTop,
    TableDateColumn,
    TablePaymentColumn,
    RowActionsColumn,
    WorkForm
  },
  computed: {
    ...mapState({
      worksTable: state => state.works.worksTable
    }),
    className() {
      return [
        "worksTableContainer",
        {
          filterMenuOpened: this.filterMenuOpened
        }
      ];
    },
    works() {
      if (!this.table) return [];

      return this.table.works;
    },
    headers() {
      if (!this.table) return [];

      return this.table.headers;
    },
    search: {
      get() {
        if (this.table) {
          return this.table.search;
        }

        return "";
      }
    },
    tableHeight() {
      return document.body.clientHeight - 195;
    }
  },
  methods: {
    collapseExpended() {
      this.expanded = [];
    },
    toggleFilterMenu(val) {
      this.filterMenuOpened = val;
    },
    openNewWorkModal() {
      this.$emit("openNewWorkModal");
    },
    searchFilter(value, search) {
      return (
        value != null &&
        search != null &&
        value
          .toString()
          .toLowerCase()
          .indexOf(search.toLowerCase()) !== -1
      );
    },
    filterOnlyCapsText(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value
          .toString()
          .toLocaleUpperCase()
          .indexOf(search) !== -1
      );
    },
    ellipsis(str = '', n = 90){
      return (str.length > n) ? str.substr(0, n-1) + '…' : str;
    },
    dateString(item) {
      return new WorkCard(item).dateString;
    },
    paymentLabel(item) {
      return new WorkCard(item).paymentInst.text;
    },
    setDisplayedWorks(items) {
      if (!this.table) return;

      this.worksTable.displayedWorks = items;
    }
  }
};
</script>
