const baseSalary = 52000;
const paychecksPerYear = 26;
const DependentCostPerYear = 500;
const benefitCostPerYear = 1000;

export async function totalBenefitCost(dependants) {
    const totalBenefitCostPerYear = (benefitCostPerYear + (DependentCostPerYear * dependants)) / paychecksPerYear;
    return Number(totalBenefitCostPerYear.toFixed(5));
}

export async function calculatePaycheckAmount(dependants) {
    const totalBenefitCostPerYear = (benefitCostPerYear + (DependentCostPerYear * dependants)) / paychecksPerYear;
    const PaycheckAmount = (baseSalary / paychecksPerYear) - totalBenefitCostPerYear;
    return Number(PaycheckAmount.toFixed(4));
}