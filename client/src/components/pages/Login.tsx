import { memo } from "react";

import { useLogin } from "../../hooks/form/useLogin";
import { LoginHeaderContainer } from "../atoms/layout/LoginHeaderContainer";
import { LoginHeaderForm } from "../molcules/layout/LoginHeaderForm";
import { FooterLayout } from "../templates/layout/FooterLayout";
import { LoginForm } from "../organisms/login/LoginForm";

export const Login = memo(() => {
  const { initialValues, onSubmit, validationSchema } = useLogin();
  const color = "#d2c9c9";

  return (
    <FooterLayout>
      <LoginHeaderContainer color={color}>
        <LoginHeaderForm signup={false} color={color}>
          <LoginForm
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          />
        </LoginHeaderForm>
      </LoginHeaderContainer>
    </FooterLayout>
  );
});
