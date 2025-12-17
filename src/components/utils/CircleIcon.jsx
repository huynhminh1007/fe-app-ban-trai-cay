import styled from "styled-components";

const StyledCircleIcon = styled.span``;

export default function CircleIcon({ children, className = "" }) {
  return (
    <StyledCircleIcon
      className={`circle-icon inline-flex h-6 w-6 items-center justify-center rounded-full text-xs ${className}`}
    >
      {children}
    </StyledCircleIcon>
  );
}
