export interface IMemberFee {
  from: number;
  to: number;
  fee: number;
  internetFee: number;
}

export const memberFee: IMemberFee[] = [
  {
    from: 1000,
    to: 1200,
    fee: 200,
    internetFee: 59
  },
  {
    from: 1200,
    to: 1300,
    fee: 225,
    internetFee: 59
  },
  {
    from: 1300,
    to: 1400,
    fee: 240,
    internetFee: 59
  },
  {
    from: 1400,
    to: 1500,
    fee: 250,
    internetFee: 59
  },
  {
    from: 1500,
    to: 1600,
    fee: 260,
    internetFee: 69
  },
  {
    from: 1600,
    to: 1700,
    fee: 275,
    internetFee: 69
  },
  {
    from: 1700,
    to: 1800,
    fee: 285,
    internetFee: 69
  },
  {
    from: 1800,
    to: 2000,
    fee: 300,
    internetFee: 69
  },
  {
    from: 2000,
    to: 2400,
    fee: 325,
    internetFee: 79
  },
  {
    from: 2400,
    to: 2500,
    fee: 335,
    internetFee: 79
  },
  {
    from: 2500,
    to: 3000,
    fee: 350,
    internetFee: 79
  },
  {
    from: 3000,
    to: 3500,
    fee: 400,
    internetFee: 79
  },
  {
    from: 3500,
    to: 4000,
    fee: 450,
    internetFee: 79
  },
  {
    from: 4000,
    to: 4500,
    fee: 475,
    internetFee: 89
  },
  {
    from: 4500,
    to: 5000,
    fee: 500,
    internetFee: 89
  },
  {
    from: 5000,
    to: 6000,
    fee: 525,
    internetFee: 89
  },
  {
    from: 6000,
    to: 7500,
    fee: 550,
    internetFee: 99
  },
  {
    from: 7500,
    to: 10000,
    fee: 575,
    internetFee: 119
  },
  {
    from: 10000,
    to: 15000,
    fee: 600,
    internetFee: 119
  },
];

export enum fuelType {
  'GAS' = 0,
  'DIESEL' = 1,
  'HYBRID ENGINE' = 2,
  'ELECTRIC' = 4
}
