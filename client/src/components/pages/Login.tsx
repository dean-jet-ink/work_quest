import { memo } from "react";

import { useLogin } from "../../hooks/form/useLogin";
import { LoginWrapper } from "../atoms/layout/LoginWrapper";
import { LoginContainer } from "../molcules/layout/LoginContainer";
import { FooterLayout } from "../templates/layout/FooterLayout";
import { LoginForm } from "../organisms/login/LoginForm";
import { HowToUse } from "../organisms/login/HowToUse";

export const Login = memo(() => {
  const { initialValues, onSubmit, validationSchema } = useLogin();
  const color = "#d2c9c9";

  return (
    <FooterLayout>
      <LoginWrapper color={color}>
        <LoginContainer signup={false} color={color}>
          <LoginForm
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          />
          <HowToUse color={color} />
        </LoginContainer>
      </LoginWrapper>
    </FooterLayout>
  );
});
