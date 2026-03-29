const baseSalary = 52000;
const paychecksPerYear = 26;
const DependentCostPerYear = 500;
const benefitCostPerYear = 1000;

export async function totalBenefitCost(dependants) {
    const totalBenefitCostPerYear = benefitCostPerYear + (DependentCostPerYear * dependants);
    return totalBenefitCostPerYear;
}

export async function totalNetPaycheck(dependants) {
    const perPaycheckDeduction = (totalBenefitCost(dependants) + (dependants * DependentCostPerYear)) / paychecksPerYear;
    return perPaycheckDeduction;
}

export async function calculatePaycheckAmount(dependants) {
    const PaycheckAmount = baseSalary - totalNetPaycheck(dependants);
    return PaycheckAmount;
}