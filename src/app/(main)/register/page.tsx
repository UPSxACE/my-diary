"use client";

import {
  Anchor,
  Button,
  Checkbox,
  LoadingOverlay,
  Paper,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useApi from "../../../api/hook";
import ErrorAlert from "../../../components/alerts/error-alert";
import PageContainer from "../../../components/page-containers/page-container";
import {
  REGEX_ALPHANUMERIC,
  REGEX_EMAIL,
  REGEX_PASSWORD,
  REGEX_USERNAME,
} from "../../../regexps";

export default function Register() {
  const [overlay, setOverlay] = useState(false);
  const [error, setError] = useState("");
  const api = useApi();
  const router = useRouter();

  async function handleRegister() {
    if (overlay) return;
    setOverlay(true);
    api
      .postRegister(form.values)
      .then(() => {
        router.push("/app");
      })
      .catch((err) => {
        if (err?.response?.status === 400) {
          // NOTE: maybe use response?.field someday
          // NOTE: For now just show the same message
          setError("Try again later.");
          setOverlay(false);
          return;
        }
        setError("Try again later.");
        setOverlay(false);
      });
  }

  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      name: "",
      password: "",
      repeat_password: "",
      terms: true,
    },

    validate: {
      name: (val) =>
        REGEX_ALPHANUMERIC.test(val)
          ? null
          : "Your name has invalid characters",
      username: (val) => (REGEX_USERNAME.test(val) ? null : "Invalid username"),
      password: (val) => {
        if (val.length < 8)
          return "Password should include at least 8 characters";
        if (val.length > 64) return "Password is too long";
        if (!REGEX_PASSWORD.test(val))
          return "Password must include at least 1 uppercase letter, 1 lowercase letter and 1 number";
        return null;
      },
      email: (val) => (REGEX_EMAIL.test(val) ? null : "Invalid email"),
      repeat_password: (val, values) =>
        val === values.password ? null : "The passwords don't match",
    },
  });

  return (
    <PageContainer secondary className="items-center justify-center p-4">
      <h1 className="m-0 text-center text-4xl font-bold">
        Welcome to MyDiary!
      </h1>
      <Anchor
        component={Link}
        href="/login"
        className="mb-8 mt-2 text-center text-sm text-mantine-dimmed"
      >
        Already have an account?{" "}
        <em className="not-italic text-mantine-primary-4">Login</em>
      </Anchor>
      <Paper
        component="form"
        withBorder
        className="relative flex w-full max-w-[420px] flex-col gap-5 rounded-md p-7"
        onSubmit={form.onSubmit(handleRegister)}
      >
        <LoadingOverlay
          visible={overlay}
          className="z-[99] rounded-md"
          zIndex={99}
          overlayProps={{ blur: 2 }}
          loaderProps={{ type: "bars" }}
        />
        <ErrorAlert title={error} visible={error != ""} />
        <TextInput
          required
          label="Username"
          placeholder="Your username"
          value={form.values.username}
          onChange={(event) =>
            form.setFieldValue("username", event.currentTarget.value)
          }
          radius="md"
          error={form.errors.username}
        />
        <TextInput
          required
          label="Name"
          placeholder="Your name"
          value={form.values.name}
          onChange={(event) =>
            form.setFieldValue("name", event.currentTarget.value)
          }
          radius="md"
          error={form.errors.name}
        />
        <TextInput
          required
          label="Email"
          placeholder="example@example.com"
          value={form.values.email}
          onChange={(event) =>
            form.setFieldValue("email", event.currentTarget.value)
          }
          error={form.errors.email}
          radius="md"
        />

        <PasswordInput
          required
          label="Password"
          placeholder="Your password"
          value={form.values.password}
          onChange={(event) =>
            form.setFieldValue("password", event.currentTarget.value)
          }
          error={form.errors.password}
          radius="md"
        />

        <PasswordInput
          required
          label="Repeat Password"
          placeholder="Your password"
          value={form.values.repeat_password}
          onChange={(event) =>
            form.setFieldValue("repeat_password", event.currentTarget.value)
          }
          error={form.errors.repeat_password}
          radius="md"
        />

        <div className="flex flex-wrap items-center gap-4 max-xs:flex-col">
          <Checkbox
            label={
              <Link
                target="_blank"
                href="/privacy-policy"
                className="text-black"
                rel="noopener noreferrer"
              >
                I accept terms and conditions
              </Link>
            }
            checked={form.values.terms}
            onChange={(event) =>
              form.setFieldValue("terms", event.currentTarget.checked)
            }
            required
          />
          <Button className="xs:ml-auto" type="submit" radius="xl">
            Register
          </Button>
        </div>
      </Paper>
    </PageContainer>
  );
}
