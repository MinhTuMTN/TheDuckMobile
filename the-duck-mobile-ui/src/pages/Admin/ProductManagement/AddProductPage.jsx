import { Box, Button, Step, StepLabel, Stepper, Typography, styled } from "@mui/material";
import { Fragment, useState } from "react";
import Step1 from "./AddProductSteps/Step1";
import Step2 from "./AddProductSteps/Step2";
import Step3 from "./AddProductSteps/Step3";

const steps = ['Thông tin chung', 'Special feature', 'Catalog'];

const RootPageAddProduct = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

function AddProductPage(props) {
    const [activeStep, setActiveStep] = useState(0);
    const [formValues, setFormValues] = useState({
        valueStep1: '',
        valueStep2: '',
        valueStep3: '',
        // Add other values as needed for different steps
    });

    const handleStepChange = (step, value) => {
        setFormValues({ ...formValues, [`valueStep${step}`]: value });
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <Step1 value={formValues} onChange={handleStepChange} />;
            case 1:
                return <Step2 value={formValues} onChange={handleStepChange} />;
            case 2:
                return <Step3 value={formValues} onChange={handleStepChange} />;
            default:
                throw new Error("Unknown step");
        }
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    return (
        <RootPageAddProduct>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};

                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>

                        {getStepContent(activeStep)}

                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Trở lại
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />

                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Thêm mới' : 'Tiếp theo'}
                            </Button>
                        </Box>
                    </Fragment>
                )}
            </Box>

        </RootPageAddProduct>
    );
}

export default AddProductPage;