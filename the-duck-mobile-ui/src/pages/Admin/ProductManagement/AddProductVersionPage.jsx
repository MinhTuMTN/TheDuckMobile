import { Box, Button, Step, StepLabel, Stepper, Typography, styled } from "@mui/material";
import { Fragment, useState } from "react";
import Step1 from "./AddProductVersionSteps/Step1";
import Step2Laptop from "./AddProductVersionSteps/Step2Laptop";
import { Link, useLocation } from "react-router-dom";
import Step2Tablet from "./AddProductVersionSteps/Step2Tablet";
import Step2SmartWatch from "./AddProductVersionSteps/Step2SmartWatch";
import Step2MobilePhone from "./AddProductVersionSteps/Step2MobilePhone";

const steps = ['Phiên Bản Sản Phẩm', 'Tính Năng Theo Danh Mục'];

const RootPageAddProductVersion = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: `0 ${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(5)}`,
}));

function AddProductVersionPage(props) {
    const location = useLocation();
    const data = location.state ? location.state : {};

    console.log(data.category);
    const [activeStep, setActiveStep] = useState(0);
    const [formValues, setFormValues] = useState({
        valueStep1: '',
        valueStep2: '',
        valueStep3: '',
    });

    const handleStepChange = (step, value) => {
        setFormValues({ ...formValues, [`valueStep${step}`]: value });
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <Step1 value={formValues} onChange={handleStepChange} />;
            case 1:
                if (data.category === "laptop")
                    return <Step2Laptop value={formValues} onChange={handleStepChange} />;
                else if (data.category === "tablet")
                    return <Step2Tablet value={formValues} onChange={handleStepChange} />;
                else if (data.category === "smart-watch")
                    return <Step2SmartWatch value={formValues} onChange={handleStepChange} />;
                else
                    return <Step2MobilePhone value={formValues} onChange={handleStepChange} />;
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
        <RootPageAddProductVersion>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep} alternativeLabel>
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
                {/* {activeStep === steps.length ? (
                    <Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                    </Fragment>
                ) : ( */}
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

                            <Button
                            component={Link}
                            onClick={handleNext}
                            to={activeStep === steps.length - 1 ? "/admin/product-management/list" : ""}
                            state={activeStep === steps.length - 2 ? data : {}}
                            >
                                {activeStep === steps.length - 1 ? "Thêm mới" : "Tiếp theo"}
                            </Button>
                        </Box>
                    </Fragment>
                {/* )} */}
            </Box>

        </RootPageAddProductVersion>
    );
}

export default AddProductVersionPage;