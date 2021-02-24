import * as F from "formik";
import type { PersonType } from "./person";
import { defaultPerson, Person } from "./person";
import * as MUI from "@material-ui/core";
import React from "react";

export const FormikForm = () => {
    const renders = React.useRef(0);
    React.useEffect(() => {
        renders.current += 1;
    });
    return (
        <F.Formik
            initialValues={defaultPerson}
            onSubmit={(values) => alert(JSON.stringify(values))}
            validate={(values) => {
                try {
                    Person.parse(values);
                } catch (error) {
                    return error.formErrors.fieldErrors;
                }
            }}
        >
            {(props) => (
                <form onSubmit={props.handleSubmit} style={{ flex: 1 }}>
                    <MUI.Box display="flex" flexDirection="column">
                        <MUI.Typography color="secondary" variant="h2">
                            Formik
                        </MUI.Typography>
                        <MUI.FormControl key="name">
                            <MUI.InputLabel htmlFor="name">name</MUI.InputLabel>
                            <MUI.Input
                                id={"name"}
                                onChange={props.handleChange}
                                value={props.values.name}
                            />
                            <DisplayError errors={props.errors} name={"name"} />
                        </MUI.FormControl>
                        <MUI.FormControl key="firstname">
                            <MUI.InputLabel htmlFor="firstname">
                                firstname
                            </MUI.InputLabel>
                            <MUI.Input
                                id={"firstname"}
                                onChange={props.handleChange}
                                value={props.values.firstname}
                            />
                            <DisplayError
                                errors={props.errors}
                                name={"firstname"}
                            />
                        </MUI.FormControl>
                        <MUI.FormControl key="email">
                            <MUI.InputLabel htmlFor="email">
                                email
                            </MUI.InputLabel>
                            <MUI.Input
                                id={"email"}
                                onChange={props.handleChange}
                                value={props.values.email}
                            />
                            <DisplayError
                                errors={props.errors}
                                name={"email"}
                            />
                        </MUI.FormControl>
                        <MUI.FormControl key="age">
                            <MUI.InputLabel htmlFor="age">age</MUI.InputLabel>
                            <MUI.Input
                                id={"age"}
                                onChange={props.handleChange}
                                value={props.values.age}
                                type="number"
                            />
                            <DisplayError errors={props.errors} name={"age"} />
                        </MUI.FormControl>
                        <MUI.FormControl key="city">
                            <MUI.InputLabel htmlFor="city">city</MUI.InputLabel>
                            <MUI.Input
                                id={"city"}
                                onChange={props.handleChange}
                                value={props.values.city}
                            />
                            <DisplayError errors={props.errors} name={"city"} />
                        </MUI.FormControl>
                        <MUI.FormControl component="fieldset">
                            <MUI.FormLabel component="legend">
                                sex
                            </MUI.FormLabel>
                            <MUI.RadioGroup id="sex">
                                {["female", "male", "other"].map((option) => (
                                    <MUI.FormControlLabel
                                        control={<MUI.Radio />}
                                        key={option}
                                        label={option}
                                        onChange={() =>
                                            props.setFieldValue("sex", option)
                                        }
                                        value={option}
                                    />
                                ))}
                            </MUI.RadioGroup>
                            <DisplayError errors={props.errors} name="sex" />
                        </MUI.FormControl>
                        <MUI.Button
                            color="secondary"
                            type="submit"
                            variant="contained"
                        >
                            Submit
                        </MUI.Button>
                        <MUI.Typography>
                            #Renders :<b>{renders.current}</b>
                        </MUI.Typography>
                    </MUI.Box>
                </form>
            )}
        </F.Formik>
    );
};

const useErrorStyle = MUI.makeStyles({
    error: {
        position: "absolute",
        bottom: 0,
    },
    placeholder: {
        height: "20px",
    },
});

const DisplayError: React.VFC<{
    errors: any;
    name: keyof PersonType;
}> = (props) => {
    const [message] = props.errors[props.name] ?? [];
    const classes = useErrorStyle();
    return (
        <>
            <div className={classes.placeholder} />
            {message && (
                <MUI.FormHelperText className={classes.error} error>
                    {message}
                </MUI.FormHelperText>
            )}
        </>
    );
};
