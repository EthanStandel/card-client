import { useState } from "react";

import { css, cx } from "@emotion/css";
import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";

import Input from "../components/Input";
import useUsername from "../hooks/useUsername";
import { desktop, mobile } from "../styles/breakpoints";

interface FormModel {
  username: string;
}

const LoginPage = () => {
  const { username, setUsername } = useUsername();

  /*
   * This hook fixes a stupid Formik bug where the changing localStorage username will
   * temp rewrite the "*initial*Values" username, creating a very quick form error that
   * results in the input field going red because it's last resolved state was invalid
   * despite the fact that the user will never see the invalid state 🙄 Only happens on
   * existing games for new users
   */
  const [initialUsername] = useState(username);

  // TODO - implement this form flow
  const onNewGame = ({ username }: FormModel) => {
    setUsername(username);
  };
  // TODO - implement this form flow
  const onExistingGame = ({ username }: FormModel) => {
    setUsername(username);
  };

  return (
    <div
      className={cx(
        css`
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        `,
        desktop(
          css`
            margin-left: 10%;
          `
        )
      )}
    >
      <Formik
        validateOnMount
        initialValues={{ username: initialUsername }}
        validationSchema={yup.object({
          username: yup.string().required(),
        })}
        onSubmit={form => onNewGame(form)}
      >
        {form => (
          <Form>
            <div
              className={cx(
                css`
                  display: flex;
                  align-items: center;
                  gap: 1em;
                `,
                mobile(
                  css`
                    flex-direction: column;
                  `
                )
              )}
            >
              <Input name="username" label="What's your name?" />
              <div
                className={css`
                  display: flex;
                  flex-direction: column;
                  gap: 1em;
                `}
              >
                <Button type="submit" variant="contained">
                  Create a game
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  onClick={async () => {
                    // Fake out submission for this onClick secondary action
                    const valid =
                      Object.keys(await form.validateForm()).length === 0;
                    form.setFieldTouched("username");
                    if (valid) {
                      onExistingGame(form.values);
                    }
                  }}
                >
                  Join an existing game
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
