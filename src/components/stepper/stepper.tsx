import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { StepProps } from '../../modules/interfaces/step-props';
import { VerticalLinearStepperProps } from '../../modules/interfaces/vertical-stepper-props';

const CustomStepIcon = styled('div', {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'completed',
})<{ active: boolean; completed: boolean }>(({ theme, active, completed }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  borderRadius: '50%',
  backgroundColor: completed
    ? theme.palette.primary.main
    : active
    ? theme.palette.primary.main
    : theme.palette.grey[400],
  color: 'white',
  marginRight: theme.spacing(1),
  position: 'relative',
  '&::after': {
    content: '""',
    display: active ? 'block' : 'none',
    width: 10,
    height: 10,
    backgroundColor: 'white',
    borderRadius: '50%',
    position: 'absolute',
  },
}));

const CustomStepLabel = styled(StepLabel, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ theme, active }) => ({
  '& .MuiStepLabel-label': {
    fontWeight: active ? 'bold' : 'normal',
    color: active ? theme.palette.text.primary : theme.palette.text.secondary,
  },
  '& .MuiStepLabel-labelContainer': {
    padding: theme.spacing(0, 1),
  },
}));

const steps: StepProps[] = [
  { label: 'Criminal History', description: 'A brief conversation about your criminal history.' },
  { label: 'Education / Employment', description: 'Your plans for further education & employment.' },
  { label: 'Financial', description: 'How you plan on providing for yourself.' },
  { label: 'Family / Marital', description: 'Your current family & marital status.' },
  { label: 'Housing', description: 'Where you plan on staying for the duration of your parole.' },
  { label: 'Leisure / Recreation', description: 'How you spend your time.' },
  { label: 'Social', description: 'Your friends outside of work.' },
  { label: 'Alcohol / Drug', description: 'Any priors for alcohol or drug abuse.' },
  { label: 'Emotional / Personal', description: 'How are you feeling.' },
];

export const handleNext = (setActiveStep: React.Dispatch<React.SetStateAction<number>>) => {
  setActiveStep((prevActiveStep) => prevActiveStep + 1);
};

export const handleBack = (setActiveStep: React.Dispatch<React.SetStateAction<number>>) => {
  setActiveStep((prevActiveStep) => prevActiveStep - 1);
};

export const handleReset = (setActiveStep: React.Dispatch<React.SetStateAction<number>>) => {
  setActiveStep(0);
};

export default function VerticalLinearStepper({ activeStep, setActiveStep }: VerticalLinearStepperProps) {
  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <CustomStepLabel
              active={activeStep === index}
              StepIconComponent={({ active, completed }) => (
                <CustomStepIcon active={Boolean(active)} completed={Boolean(completed)}>
                  {completed ? '✓' : ''}
                </CustomStepIcon>
              )}
            >
              <Typography variant="subtitle1">{step.label}</Typography>
              <Typography variant="body2" color="textSecondary">{step.description}</Typography>
            </CustomStepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}