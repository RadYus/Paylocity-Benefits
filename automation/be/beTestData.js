const baseSalary = 52000;
const paychecksPerYear = 26;
const dependentCostPerYear = 500;
const benefitCostPerYear = 1000;

export function benefitCostPerPaycheck(dependents) {
    const cost = (benefitCostPerYear + (dependentCostPerYear * dependents)) / paychecksPerYear;
    return Number(cost.toFixed(5));
}

export function paycheckAmount(dependents) {
    const deduction = benefitCostPerPaycheck(dependents);
    const grossPerPaycheck = baseSalary / paychecksPerYear;
    return Number((grossPerPaycheck - deduction).toFixed(4));
}
